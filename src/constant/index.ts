export const themeColor = {
  primary: "#7367f0",
  light_text_color: "#fff",
};

export const convertDataForSelect = (data: any, key: string) => {
  if (data?.length === 0) {
    return [];
  }
  return data?.map((item: any) => {
    return {
      label: item[key],
      value: item.id,
    };
  });
};