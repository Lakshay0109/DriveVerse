import https from 'https';

const getImages = (query: string) => {
  return new Promise((resolve) => {
    https.get(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=5`, {
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', console.error);
  });
};

const run = async () => {
  try {
    const data: any = await getImages('honda civic type r');
    if (data && data.results) {
      data.results.forEach((r: any) => console.log('Honda Civic:', r.id, r.urls.raw));
    }
    
    const data2: any = await getImages('porsche 911');
    if (data2 && data2.results) {
      data2.results.forEach((r: any) => console.log('Porsche 911:', r.id, r.urls.raw));
    }
  } catch(e) {
    console.error(e);
  }
};

run();
