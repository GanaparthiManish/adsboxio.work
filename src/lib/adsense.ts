export const initializeAdsense = () => {
  // Only initialize once
  if (typeof window !== 'undefined' && !(window as any).adsenseInitialized) {
    (window as any).adsenseInitialized = true;
    
    // Remove any existing AdSense scripts
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7742116991881000';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => {
      console.log('AdSense script loaded successfully');
    };
    document.head.appendChild(script);
  }
};

export const loadAd = (container: HTMLElement) => {
  try {
    if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
      // Clear existing ads
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      // Create new ad
      const adElement = document.createElement('ins');
      adElement.className = 'adsbygoogle';
      adElement.style.display = 'block';
      adElement.style.width = '100%';
      adElement.style.height = '250px';
      adElement.setAttribute('data-ad-client', 'ca-pub-7742116991881000');
      adElement.setAttribute('data-ad-slot', '1234567890'); // Replace with your ad slot ID
      adElement.setAttribute('data-ad-format', 'auto');
      adElement.setAttribute('data-full-width-responsive', 'true');

      container.appendChild(adElement);
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    }
  } catch (error) {
    console.error('AdSense error:', error);
  }
};