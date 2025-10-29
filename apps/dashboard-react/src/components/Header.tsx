export const Header: React.FC = () => {
  return (
    <div className="header" style={{ position: 'fixed', top: 0, left: '288px', right: 0, zIndex: 50 }}>
      <div className="container">
        <div className="header-container">
          <button className="notification-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="m13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>

          <div className="container2">
            <div className="container3">
              <div className="container4">
                <div className="dra-letcia-lopes">Dra. Letícia Lopes</div>
              </div>
              <div className="container5">
                <div className="marketing-consultant">Marketing Consultant</div>
              </div>
            </div>
            <div className="backgroundshadow">
              <div className="al">AL</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
