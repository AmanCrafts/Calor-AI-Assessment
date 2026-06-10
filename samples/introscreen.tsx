import React, { useState } from 'react';
interface MobileTabBarProps {
  className?: string;
  style?: React.CSSProperties;
}
export const MobileTabBar: React.FC<MobileTabBarProps> = ({
  className,
  style
}) => {
  const [activeTab, setActiveTab] = useState<'start' | 'faq' | 'taste'>('start');
  const handleTabClick = (tab: 'start' | 'faq' | 'taste') => {
    setActiveTab(tab);
  };
  const buttonBaseStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    outline: 'none',
    transition: 'transform 0.1s ease, opacity 0.2s ease'
  };
  const tabLabelStyle = (isActive: boolean): React.CSSProperties => ({
    height: 'auto',
    color: isActive ? 'rgba(75, 216, 131, 1)' : 'rgba(191, 191, 191, 1)',
    boxSizing: 'content-box',
    fontSize: '10px',
    fontFamily: '"SF Pro", -apple-system, BlinkMacSystemFont, sans-serif',
    fontWeight: isActive ? 590 : 510,
    lineHeight: '12px',
    letterSpacing: isActive ? '-0.1px' : '0px',
    textAlign: 'center',
    flexShrink: 0,
    alignSelf: 'stretch',
    minWidth: '0',
    zIndex: 2,
    position: 'relative',
    mixBlendMode: isActive ? 'normal' : 'color-dodge'
  });
  const tabIconStyle = (isActive: boolean): React.CSSProperties => ({
    height: 'auto',
    color: isActive ? 'rgba(75, 216, 131, 1)' : 'rgba(191, 191, 191, 1)',
    boxSizing: 'content-box',
    fontSize: '17px',
    fontFamily: '"SF Pro", sans-serif',
    fontWeight: 590,
    lineHeight: '28px',
    letterSpacing: '0px',
    textAlign: 'center',
    flexShrink: 0,
    alignSelf: 'stretch',
    minWidth: '0',
    zIndex: 1,
    position: 'relative',
    mixBlendMode: isActive ? 'normal' : 'color-dodge'
  });
  return <div className={`iphone-16-pro-max-7 ${className || ''}`.trim()} style={{
    width: '100%',
    maxWidth: '440px',
    height: '956px',
    background: 'linear-gradient(180deg, rgba(24, 24, 26, 1.00) 0%, rgba(10, 10, 10, 1.00) 100%)',
    boxSizing: 'border-box',
    overflow: 'hidden',
    position: 'relative',
    margin: '0 auto',
    ...style
  }}>
      {/* Background Decorative Orbs */}
      <div className="background-orbs" style={{
      width: '757px',
      height: '774px',
      boxSizing: 'border-box',
      position: 'absolute',
      left: '-102px',
      top: '28px',
      pointerEvents: 'none'
    }}>
        <div className="ellipse-5" style={{
        width: '476px',
        height: '520px',
        backgroundColor: 'rgba(75, 216, 131, 0.12)',
        boxSizing: 'border-box',
        filter: 'blur(57.3px)',
        position: 'absolute',
        left: '281px',
        top: '254px',
        borderRadius: '50%'
      }} />
        <div className="ellipse-6" style={{
        width: '200px',
        height: '200px',
        backgroundColor: 'rgba(46, 181, 255, 0.12)',
        boxSizing: 'border-box',
        filter: 'blur(60px)',
        position: 'absolute',
        left: '0px',
        top: '0px',
        borderRadius: '50%'
      }} />
      </div>

      {/* Main Content Area */}
      <main className="start-card" style={{
      width: '402px',
      height: '596px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: '45px',
      paddingBottom: '45px',
      gap: '31px',
      boxSizing: 'border-box',
      position: 'absolute',
      left: '19px',
      top: '180px'
    }}>
        <div className="liquid-glass-regular-large" style={{
        width: '402px',
        height: '596px',
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        borderRadius: '40px',
        boxSizing: 'content-box',
        position: 'absolute',
        left: '0px',
        top: '0px',
        zIndex: 0
      }} />
        <span className="emoji" style={{
        width: '402px',
        height: '85px',
        color: 'rgba(217, 217, 217, 1)',
        boxSizing: 'content-box',
        fontSize: '80px',
        fontFamily: '"SF Pro", sans-serif',
        fontWeight: 700,
        lineHeight: '30px',
        letterSpacing: '-0.56px',
        textAlign: 'center',
        zIndex: 1,
        position: 'relative'
      }}>{'😋'}</span>
        <span className="build-your-taste-profile" style={{
        width: '402px',
        height: '59px',
        color: 'rgba(217, 217, 217, 1)',
        boxSizing: 'content-box',
        fontSize: '28px',
        fontFamily: '"SF Pro", sans-serif',
        fontWeight: 700,
        lineHeight: '30px',
        letterSpacing: '-0.56px',
        textAlign: 'center',
        zIndex: 2,
        position: 'relative'
      }}>{'Build Your Taste Profile'}</span>
        <p className="description" style={{
        width: '378px',
        margin: 0,
        color: 'rgba(217, 217, 217, 1)',
        boxSizing: 'content-box',
        fontSize: '22px',
        fontFamily: '"SF Pro", sans-serif',
        fontWeight: 400,
        lineHeight: '30px',
        letterSpacing: '-0.56px',
        textAlign: 'center',
        zIndex: 3,
        position: 'relative'
      }}>{'Swipe right on foods you love, left on foods you don\'t.'}</p>
        <p className="sub-description" style={{
        width: '378px',
        margin: 0,
        color: 'rgba(217, 217, 217, 1)',
        boxSizing: 'content-box',
        fontSize: '17px',
        fontFamily: '"SF Pro", sans-serif',
        fontWeight: 400,
        lineHeight: '30px',
        letterSpacing: '-0.56px',
        textAlign: 'center',
        zIndex: 4,
        position: 'relative'
      }}>{'This helps us recommend meals you’ll love eating.'}</p>
        
        <button className="button-content-area" style={{
        ...buttonBaseStyle,
        width: '173px',
        height: '49px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '7px 14px',
        backgroundColor: 'rgba(75, 216, 131, 1)',
        borderRadius: '1000px',
        zIndex: 5,
        position: 'relative'
      }} onMouseEnter={e => e.currentTarget.style.opacity = '0.9'} onMouseLeave={e => e.currentTarget.style.opacity = '1'} onClick={() => console.log('Start Swiping clicked')}>
          <label style={{
          cursor: 'pointer',
          color: 'rgba(0, 0, 0, 1)',
          fontSize: '16px',
          fontFamily: '"SF Pro", sans-serif',
          fontWeight: 590,
          lineHeight: '21px',
          letterSpacing: '-0.31px'
        }}>{'Start Swiping'}</label>
        </button>
        
        <span className="takes-about-2-minutes" style={{
        width: '378px',
        height: '19px',
        color: 'rgba(217, 217, 217, 1)',
        boxSizing: 'content-box',
        fontSize: '15px',
        fontFamily: '"SF Pro", sans-serif',
        fontWeight: 400,
        lineHeight: '30px',
        letterSpacing: '-0.56px',
        textAlign: 'center',
        zIndex: 6,
        position: 'relative'
      }}>{'Takes about 2 minutes.'}</span>
      </main>

      {/* Header / Top Toolbar */}
      <header className="toolbar-top-iphone" style={{
      width: '402px',
      height: '105px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingBottom: '10px',
      gap: '10px',
      boxSizing: 'border-box',
      position: 'absolute',
      left: '16px',
      top: '44px'
    }}>
        <div className="controls" style={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
        boxSizing: 'border-box',
        flexShrink: 0,
        alignSelf: 'stretch',
        minWidth: '0'
      }}>
          <div className="leading" style={{
          width: 'auto',
          height: 'auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '10px',
          boxSizing: 'border-box',
          flexShrink: 0
        }}>
            <button className="button-group-1" style={{
            ...buttonBaseStyle,
            width: '44px',
            height: '44px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            boxSizing: 'border-box',
            borderRadius: '296px',
            position: 'relative'
          }} aria-label="Go back">
              <div className="bg" style={{
              width: '44px',
              height: '44px',
              position: 'absolute',
              left: '0px',
              top: '0px',
              zIndex: 0
            }}>
                <div className="fill" style={{
                width: '44px',
                height: '44px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '1000px'
              }} />
              </div>
              <div className="text" style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mixBlendMode: 'color-dodge',
              borderRadius: '100px',
              zIndex: 1,
              position: 'relative'
            }}>
                <span style={{
                color: 'rgba(191, 191, 191, 1)',
                fontSize: '17px',
                fontFamily: '"SF Pro", sans-serif',
                fontWeight: 510
              }}>{'􀯶'}</span>
              </div>
            </button>
          </div>
          <div className="spacer" style={{
          width: '8px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          alignSelf: 'stretch',
          minHeight: '0'
        }} />
        </div>
        <div className="title-and-subtitle" style={{
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '16px',
        paddingRight: '16px',
        boxSizing: 'border-box',
        flexShrink: 0,
        alignSelf: 'stretch',
        minWidth: '0'
      }}>
          <div className="title" style={{
          height: '41px',
          boxSizing: 'border-box',
          alignSelf: 'stretch',
          minWidth: '0',
          position: 'relative'
        }}>
            <h1 style={{
            margin: 0,
            width: '352px',
            height: '41px',
            color: 'rgba(255, 255, 255, 1)',
            boxSizing: 'border-box',
            fontSize: '34px',
            fontFamily: '"SF Pro", sans-serif',
            fontWeight: 700,
            lineHeight: '41px',
            letterSpacing: '0.4px',
            textAlign: 'left',
            position: 'absolute',
            left: '0px',
            top: '0px'
          }}>{'Design Your Food Plan'}</h1>
          </div>
        </div>
      </header>

      {/* Navigation / Tab Bar */}
      <nav className="tab-bar-iphone" style={{
      width: '402px',
      height: '95px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      padding: '16px 25px 25px',
      gap: '16px',
      boxSizing: 'border-box',
      position: 'absolute',
      left: '19px',
      top: '828px'
    }}>
        <div className="tab-bar-buttons-container" style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        flexGrow: 1,
        height: '54px'
      }}>
          <div className="bg" style={{
          width: '290px',
          height: '62px',
          boxSizing: 'content-box',
          position: 'absolute',
          left: '-4px',
          top: '-4px',
          zIndex: 0
        }}>
            <div className="fill" style={{
            width: '290px',
            height: '62px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            opacity: 0.67,
            borderRadius: '1000px'
          }} />
          </div>

          <button onClick={() => handleTabClick('start')} style={{
          ...buttonBaseStyle,
          flex: 1,
          height: '100%',
          zIndex: 1,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            {activeTab === 'start' && <div className="selection" style={{
            width: '101px',
            height: '54px',
            backgroundColor: 'rgba(18, 18, 18, 1)',
            boxSizing: 'border-box',
            mixBlendMode: 'color-dodge',
            borderRadius: '100px',
            position: 'absolute',
            left: '0px',
            top: '0px',
            zIndex: 0
          }} />}
            <span style={tabIconStyle(activeTab === 'start')}>{'􀎟'}</span>
            <label style={tabLabelStyle(activeTab === 'start')}>{'Start'}</label>
          </button>

          <button onClick={() => handleTabClick('faq')} style={{
          ...buttonBaseStyle,
          flex: 1,
          height: '100%',
          zIndex: 2,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            {activeTab === 'faq' && <div className="selection" style={{
            width: '101px',
            height: '54px',
            backgroundColor: 'rgba(18, 18, 18, 1)',
            boxSizing: 'border-box',
            mixBlendMode: 'color-dodge',
            borderRadius: '100px',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '0px',
            zIndex: 0
          }} />}
            <span style={tabIconStyle(activeTab === 'faq')}>{'􀅍'}</span>
            <label style={tabLabelStyle(activeTab === 'faq')}>{'FAQ'}</label>
          </button>

          <button onClick={() => handleTabClick('taste')} style={{
          ...buttonBaseStyle,
          flex: 1,
          height: '100%',
          zIndex: 3,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            {activeTab === 'taste' && <div className="selection" style={{
            width: '101px',
            height: '54px',
            backgroundColor: 'rgba(18, 18, 18, 1)',
            boxSizing: 'border-box',
            mixBlendMode: 'color-dodge',
            borderRadius: '100px',
            position: 'absolute',
            right: '0px',
            top: '0px',
            zIndex: 0
          }} />}
            <span style={tabIconStyle(activeTab === 'taste')}>{'􁖏'}</span>
            <label style={tabLabelStyle(activeTab === 'taste')}>{'Taste Profile'}</label>
          </button>
        </div>

        <div className="search-container" style={{
        width: '54px',
        height: '54px',
        position: 'relative',
        flexShrink: 0
      }}>
          <div className="bg" style={{
          width: '62px',
          height: '62px',
          position: 'absolute',
          left: '-4px',
          top: '-4px',
          zIndex: 0
        }}>
            <div className="fill" style={{
            width: '62px',
            height: '62px',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            opacity: 0.67,
            borderRadius: '1000px'
          }} />
          </div>
          <button className="search-tab" style={{
          ...buttonBaseStyle,
          width: '54px',
          height: '54px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          position: 'relative'
        }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} aria-label="Search">
            <span style={{
            height: 'auto',
            color: 'rgba(191, 191, 191, 1)',
            mixBlendMode: 'color-dodge',
            fontSize: '17px',
            fontFamily: '"SF Pro", sans-serif',
            fontWeight: 590,
            lineHeight: '28px'
          }}>{'􀊫'}</span>
          </button>
        </div>
      </nav>
    </div>;
};