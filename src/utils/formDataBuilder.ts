/* eslint-disable @typescript-eslint/no-explicit-any */

function buildFormData(
  formData: FormData,
  data: any,
  parentKey: string = ""
): void {
  if (
    data &&
    typeof data === "object" &&
    !(data instanceof Date) &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data == null ? "" : data;
    formData.append(parentKey, value);
  }
}

export function jsonToFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  buildFormData(formData, data);
  return formData;
}
