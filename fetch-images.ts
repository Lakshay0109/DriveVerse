import https from 'https';

const checkUrl = (url: string) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
      res.resume(); // consume response data to free up memory
    }).on('error', (e) => resolve({ url, status: e.message }))
      .setTimeout(3000, () => resolve({ url, status: 'timeout' }));
  });
};

const run = async () => {
  const images = [
    "https://images.unsplash.com/photo-1617788138017-80ad40651399", // Tesla 1
    "https://images.unsplash.com/photo-1560958089-b8a1929cea89", // Tesla 2
    "https://images.unsplash.com/photo-1503376713356-2e861aacfbc9", // Porsche
    "https://images.unsplash.com/photo-1555353540-64fd1b19584d", // BMW
    "https://images.unsplash.com/photo-1614026480418-53dbdfb64aea", // Audi
    "https://images.unsplash.com/photo-1520031441872-265e4ff70366", // Mercedes
    "https://images.unsplash.com/photo-1669049755490-8edccfcd715a", // Rivian
    "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd", // Toyota
    "https://images.unsplash.com/photo-1559828485-64d8a2bc4436", // Ford
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341", // Lexus
    "https://images.unsplash.com/photo-1628172965416-c875d97f26d7", // Polestar 2
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81", // Honda
    "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143", // VW
    "https://images.unsplash.com/photo-1627092928174-8b01bb5d233e", // Kia
    "https://images.unsplash.com/photo-1596541527011-2ebf4db7a956", // Chevy
    "https://images.unsplash.com/photo-1660309191024-5d5ee1fe6a1d" // Hyundai
  ];

  for (const url of images) {
    const r = await checkUrl(url + "?auto=format&fit=crop&w=300&q=80");
    console.log(`${r.status}: ${url}`);
  }
};

run().catch(console.error);
