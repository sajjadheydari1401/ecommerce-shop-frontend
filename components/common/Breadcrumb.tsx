interface Props {
  title?: string;
  subTitle?: string;
}

export const Breadcrumb = ({ title, subTitle }: Props) => {
  const categories = [title, subTitle].filter(Boolean);

  if (categories.length === 0) return null;

  return <div className="text-sm text-gray-500">{categories.join(" > ")}</div>;
};
