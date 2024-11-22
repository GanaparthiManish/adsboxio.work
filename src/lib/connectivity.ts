import { BehaviorSubject } from 'rxjs';
import localforage from 'localforage';

class ConnectivityManager {
  private static instance: ConnectivityManager;
  private _isOnline = new BehaviorSubject<boolean>(navigator.onLine);
  private _retryCount = 0;
  private _maxRetries = 3;
  private _retryDelay = 2000;
  private _pendingOperations: Array<() => Promise<void>> = [];

  private constructor() {
    this.initializeListeners();
    this.processPendingOperations();
  }

  private initializeListeners() {
    window.addEventListener('online', () => {
      this._isOnline.next(true);
      this._retryCount = 0;
      this.processPendingOperations();
    });
    
    window.addEventListener('offline', () => {
      this._isOnline.next(false);
    });

    // Check connection periodically
    setInterval(() => this.checkConnection(), 30000);
  }

  private async checkConnection() {
    try {
      const response = await fetch('https://www.google.com/favicon.ico', {
        mode: 'no-cors',
        cache: 'no-cache'
      });
      this._isOnline.next(true);
      this._retryCount = 0;
      this.processPendingOperations();
    } catch (error) {
      if (this._retryCount < this._maxRetries) {
        this._retryCount++;
        setTimeout(() => this.checkConnection(), this._retryDelay * Math.pow(2, this._retryCount));
      } else {
        this._isOnline.next(false);
      }
    }
  }

  private async processPendingOperations() {
    if (!this.isOnline || this._pendingOperations.length === 0) return;

    const operations = [...this._pendingOperations];
    this._pendingOperations = [];

    for (const operation of operations) {
      try {
        await operation();
      } catch (error) {
        console.error('Failed to process pending operation:', error);
        this._pendingOperations.push(operation);
      }
    }
  }

  public addPendingOperation(operation: () => Promise<void>) {
    this._pendingOperations.push(operation);
    if (this.isOnline) {
      this.processPendingOperations();
    } else {
      // Store pending operation in persistent storage
      localforage.setItem('pendingOperations', this._pendingOperations);
    }
  }

  static getInstance(): ConnectivityManager {
    if (!ConnectivityManager.instance) {
      ConnectivityManager.instance = new ConnectivityManager();
    }
    return ConnectivityManager.instance;
  }

  get isOnline$() {
    return this._isOnline.asObservable();
  }

  get isOnline() {
    return this._isOnline.value;
  }
}

export const connectivityManager = ConnectivityManager.getInstance();