export const fetchData = async (url) => {
  const res = await fetch(url);
  const items = await res.json();
  const data = [];
  for (const item in items) {
    data.push({
      id: item,
      name: items[item].name,
    });
  }
  return data;
};
