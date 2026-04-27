import https from 'https';

const ids = [
  "1494976388531-d1058494cdd8", // Mustang
  "1492144534655-ae79c964c9d7", // Camaro
  "1549317661-bd32c8ce0db2", // GTR
  "1502877338535-766e1452684a", // nice car
  "1542282088-fe8426682b8f", // generic
  "1553440569-bea36a8eb147", // car
  "1503376713356-2e861aacfbc9", // Porsche (404)
  "1583121274602-3e2820c69888", // Porsche
  "1614200187524-dc4b892acf16", // BMW
  "1541443131876-44b03de101c5", // Audi
  "1669049755490-8edccfcd715a", // Rivian
  "1621007947382-bb3c3994e3fd", // RAV4
  "1559828485-64d8a2bc4436", // Ford
  "1628172965416-c875d97f26d7", // Polestar
  "1603513492128-ba7bc9b3e143", // VW
  "1627092928174-8b01bb5d233e", // Kia
  "1596541527011-2ebf4db7a956", // Chevy
  "1660309191024-5d5ee1fe6a1d", // Hyundai
  "1514316454349-750a7fd3da3a", // car
  "1511919884179-8ebf16fd514e", // car
  "1493238792000-8113da2ae8ec", // car
  "1512411931364-77a83dcf3e28", // car
  "1504215680853-026ed2a45def", // car
  "1514316454349-750a7fd3da3a", // car
  "1552519507-da3b142c6e3d", // car
  "1544829099-b15c62039d1c", // car
  "1508344928928-71e5b5113853", // car
  "1490243248048-89ea2bfdb1e5", // car
  "1533473359331-0135ef1b58bf", // f150
  "1555353540-64fd1b19584d" // bmw
];

const checkUrl = (id: string) => {
  return new Promise((resolve) => {
    https.get(`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=300&q=80`, (res) => {
      resolve({ id, status: res.statusCode });
      res.resume(); 
    }).on('error', (e) => resolve({ id, status: e.message }))
      .setTimeout(3000, () => resolve({ id, status: 'timeout' }));
  });
};

const run = async () => {
    const results = [];
    for (const id of ids) {
        const r = await checkUrl(id);
        if (r.status === 200) results.push(r.id);
    }
    console.log(results);
}
run();
