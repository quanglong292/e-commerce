export default async (model: any, ids: string[]): Promise<any[] | []> => {
  return (await model?.find({ id: ids })) ?? [];
};
