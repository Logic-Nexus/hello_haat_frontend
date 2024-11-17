export const themeColor = {
  primary: "#7367f0",
  light_text_color: "#fff",
};

export const convertDataForSelect = (
  data: any,
  key: string,
  code: string = ""
) => {
  if (data?.length === 0) {
    return [];
  }
  return data?.map((item: any) => {
    return {
      label: item[code] ? `${item[key]} (${item[code]})` : item[key],
      value: item.id,
    };
  });
};

export const convertLocationDataForSelect = (data: any) => {
  if (data?.length === 0) {
    return [];
  }
  return data?.map((item: any) => {
    return {
      label: `${item.name} (${item.bn_name})`,
      value: item.id,
    };
  });
};
