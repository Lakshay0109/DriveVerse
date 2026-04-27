import https from 'https';

const checkUrl = (url: string) => {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => resolve({ url, status: e.message }))
      .setTimeout(3000, () => resolve({ url, status: 'timeout' }));
  });
};

const run = async () => {
    const urls = [
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/porsche-911-gt2/model.gltf",
      "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/cybertruck/model.gltf"
    ];
    for (const url of urls) {
        console.log(await checkUrl(url));
    }
}
run();
