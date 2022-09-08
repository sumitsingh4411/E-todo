// @ts-nocheck

export function getSortedBy(data: Array<object>, key: string) {
  if (key === "createdAt") {
    return data
      .slice()
      .sort((a: any, b: any) => new Date(b[key]) - new Date(a[key]));
  }
  let sortedData = data.slice().sort((a: any, b: any) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
  return sortedData;
}
