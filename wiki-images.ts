import https from 'https';

const getWikiImage = (title: string): Promise<string | null> => {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=1200`;
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 Driveverse/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pageId === '-1') return resolve(null);
          const imageUrl = pages[pageId].thumbnail?.source;
          resolve(imageUrl || null);
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
};

const run = async () => {
  const cars = [
    "Porsche 911 GT3",
    "BMW M5",
    "Audi e-tron GT",
    "Rivian R1S",
    "Toyota RAV4",
    "Ford F-150 Lightning",
    "Honda Civic Type R",
    "Kia Telluride",
    "Chevrolet Corvette",
    "Hyundai Ioniq 5"
  ];
  for (const car of cars) {
    const img = await getWikiImage(car);
    console.log(`${car}: ${img}`);
  }
};

run();
