import React, { useContext, useState, useRef, useEffect } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";
import { GoogleLogin } from "react-google-login";
import UserService from "../../Services/UserService";
import Header, {
  NavLink,
  NavLinks,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
  PrimaryLink as PrimaryLinkBase,
} from "../headers/light.js";

const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none w-full`}
  ${DesktopNavLinks} ${NavLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 `}
  }
  ${NavToggle}.closed {
    ${tw`text-gray-100 hover:text-gray-500`}
  }
`;
const PrimaryLink = tw(PrimaryLinkBase)`rounded-full `;
const SocialLinksContainer = tw.div`mt-4 text-center lg:text-left`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-500 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const Navbar = (props) => {
  const {
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin,
  } = useContext(AuthContext);
  const authContext = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  // console.log("navbar", user);
  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
        setIsAdmin(false);
      }
    });
  };
  const onClickLoginHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };


  const unauthenticatedNavBar = () => {
    return (
      <>
        <NavLink href="#about">Home</NavLink>
        <NavLink href="#about">About</NavLink>
        <NavLink href="#letstalk">Contact Us</NavLink>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>  <NavLink href="#about">Home</NavLink>
      <NavLink href="#questions">Questions</NavLink>
      <NavLink href="#addquestions">Add Question</NavLink>
      <NavLink href="#blogs">Blogs</NavLink>
      <NavLink href="#addblogs">Add Blog</NavLink>
      <NavLink href="#letstalk">Contact Us</NavLink>
      <NavLink href="#chatWindow">Connect & Chat</NavLink>
      </>
    );
  };
  // const adminNavBar = () => {
  //   return (
  //     <>
  //       <NavLink href="#about">Home</NavLink>
  //       <NavLink href="#admin_incidents">Incidents</NavLink> 
  //     </>
  //   );
  // };

  const navlinks = () => {
    if (!isAuthenticated) return unauthenticatedNavBar();
    else {
      return authenticatedNavBar();
    }
  };
  const [Userdetail, setUserdetail] = useState({
    id: "",
    name: "",
    email: "",
    image: "",
  });
  const [msg, setMsg] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);
  const handleFailure = (result) => {
    console.log(result);
  };
  const handleLogin = (result) => {
    AuthService.login({ token: result.tokenId }).then((data) => {
      // console.log(data);
      const { isAuthenticated, user, message, isAdmin } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        console.log(user);
        setUserdetail({id:user.iat, name:user.name,email:user.email,image: user.picture});
        console.log("debug")
        authContext.setIsAuthenticated(isAuthenticated);
        authContext.setIsAdmin(isAdmin);
        // console.log(Userdetail)

        UserService.getUserByemail(user.email).then((data)=>{
            console.log(data);
            if(data.user==null){
              UserService.addUser({id:user.id,name:user.name,email:user.email,image:user.picture}).then((data) => {
                const { msg } = data;
                setMsg(msg);
              });
            }
            else{
              console.log("user already exist")
            }
        });
      } else {
        alert(message.msgBody);
        setMessage(message);
      }
    });
  };
  const navLinks = [
    <NavLinks key={1}> {navlinks()}</NavLinks>,
    <NavLinks key={2}>
      
      {isAuthenticated ? (
        <button>
          <PrimaryLink onClick={onClickLogoutHandler} href="/#">
            Logout
          </PrimaryLink>
        </button>
      ) : (
        <GoogleLogin
          render={(renderProps) => (
            <button>
              <PrimaryLink
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login
              </PrimaryLink>
            </button>
          )}
          clientId="373151948151-5k1he8abmr2a1ok10g07c9phkmjld2jk.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={handleLogin}
          onFailure={handleFailure}
          cookiePolicy={"single_host_origin"}
        />
      )}
    </NavLinks>,
  ];

  return <StyledHeader links={navLinks} />;
};

export default Navbar;
