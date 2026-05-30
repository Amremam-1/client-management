type HeaderProps = {
  name: string;
  buttonComponent?: string;
  textSmall?: boolean;
};

const Header = ({ name, buttonComponent, textSmall = false }: HeaderProps) => {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h1
        className={`${textSmall ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}
      >
        {name}
      </h1>

      {buttonComponent}
    </div>
  );
};

export default Header;
