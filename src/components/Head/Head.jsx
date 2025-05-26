import React from "react";

const Head = ({
  logo,
  title,
  subtitle,
  navItems,
  navClassName = "",
  onNavClick,
  onSearch,
}) => {
  const [search, setSearch] = React.useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="bg-black text-red flex flex-col items-center py-4 px-8 w-full">
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          {logo && <img src={logo} alt="Logo" className="w-10 h-10" />}
          <h1 className="text-2xl font-bold text-red-500">{title}</h1>
        </div>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Buscar películas..."
          className="px-3 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-64 text-black"
        />

        <div className="flex justify-center">
          <nav className={navClassName}>
            {navItems &&
              navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => onNavClick && onNavClick(item.href)}
                  className="text-white hover:text-white-400 font-bold transition text-lg bg-red-500 px-8 py-4 rounded-lg"
                >
                  {item.label}
                </button>
              ))}
          </nav>
        </div>
      </div>
      {subtitle && (
        <h2 className="text-lg text-red-400 mt-2">{subtitle}</h2>
      )}
    </header>
  );
};

export default Head;
