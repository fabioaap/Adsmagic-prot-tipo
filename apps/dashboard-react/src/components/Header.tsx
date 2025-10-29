import { Bell } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header-container">
          <button className="notification-button">
            <Bell className="w-5 h-5" />
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
