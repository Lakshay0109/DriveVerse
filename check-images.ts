import https from 'https';

const urls = [
  "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503376713356-2e861aacfbc9?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1555353540-64fd1b19584d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1616422285623-14ff0162a4b5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1614026480209-cd9934144671?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1669049755490-8edccfcd715a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1681283688636-12185fd9c18d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1628172965416-c875d97f26d7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1603513492128-ba7bc9b3e143?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1627092928174-8b01bb5d233e?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1596541527011-2ebf4db7a956?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1660309191024-5d5ee1fe6a1d?auto=format&fit=crop&w=1200&q=80"
];

Promise.all(urls.map(url => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => resolve({ url, status: e.message }));
  });
})).then(console.log);
