const Header = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">Hello, AmitThakur 👋</span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
};

export default Header;
