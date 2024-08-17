// components/Footer.tsx

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-500 text-white mt-5 w-full py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">BankDocs</h2>
            <p className="text-sm">© 2024 BankDocs. All rights reserved.</p>
          </div>
         <div></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
