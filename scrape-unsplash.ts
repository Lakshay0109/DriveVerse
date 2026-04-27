import https from 'https';

const getUnsplashImages = (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/s/photos/${encodeURIComponent(query)}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // Unsplash encodes images inside JSON in a <script id="__NEXT_DATA__"> or just straight image URLs.
        // Let's try to find raw image URLs
        const regex = /https:\/\/images\.unsplash\.com\/photo-[a-zA-Z0-9-]+\?auto=format/g;
        const matches = data.match(regex);
        if (matches) {
          // clean up and deduplicate, return first few
          const unique = [...new Set(matches.map(m => m.split('?')[0]))];
          resolve(unique);
        } else {
          resolve([]);
        }
      });
    }).on('error', () => resolve([]));
  });
};

const run = async () => {
  const cars = [
    "Porsche 911",
    "BMW M5",
    "electric car",
    "Range Rover",
    "Toyota SUV",
    "Ford lightning",
    "Honda Civic Type R",
    "sports car",
    "Volkswagen Golf",
    "Kia Telluride",
    "Hyundai Ioniq"
  ];
  for (const car of cars) {
    const urls = await getUnsplashImages(car);
    console.log(`${car}:`, urls.slice(0, 3));
  }
};

run();
