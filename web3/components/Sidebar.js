import { VscTwitter } from 'react-icons/vsc'
import SidebarOptions from './SidebarOptions'
import {useState} from 'react'
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { FiBell, FiMoreHorizontal } from 'react-icons/fi'
import { HiOutlineMail, HiMail } from 'react-icons/hi'
import { FaRegListAlt, FaHashtag, FaBell } from 'react-icons/fa'
import { CgMoreO } from 'react-icons/cg'
import { BsBookmark, BsBookmarkFill, BsPerson, BsPersonFill,} from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { TwitterContext } from '../context/TwitterContext'
import Modal from 'react-modal'
import ProfileImageMinter from './mintingModal/ProfileImageMinter'
import  { customStyles }  from '../lib/constants'

const style = {
    wrapper: `flex-[0.7] px-8 flex flex-col`,
    twitterIconContainer: `text-3xl m-4`,
    tweetButton: `bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
    navContainer: `flex-1`,
    profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-[100px] p-2`,
    profileLeft: `flex item-center justify-center mr-4`,
    profileImage: `height-12 w-12 rounded-full`,
    profileRight: `flex-1 flex`,
    details: `flex-1`,
    name: `text-lg`,
    handle: `text-[#8899a6]`,
    moreContainer: `flex items-center mr-2`,
}



const Sidebar = ({initialSelectedIcon = 'Home'}) => {
    const router = useRouter()
    const [selected, setSelected] = useState(initialSelectedIcon)
    const {currentAccount, currentUser} = useContext(TwitterContext)

    return(
        <div className={style.wrapper}>
            <div className={style.twitterIconContainer}>
                <VscTwitter/>
            </div>
            <div className={style.navContainer}>
                <SidebarOptions Icon={selected == 'Home'? RiHome7Fill : RiHome7Line }
                text='Home'
                isActive={Boolean(selected == 'Home')}
                setSelected={setSelected}
                redirect={'/'}
                />
                <SidebarOptions Icon={selected == 'Explore'? FaHashtag : BiHash }
                text='Explore'
                isActive={Boolean(selected == 'Explore')}
                setSelected={setSelected}
                />
                <SidebarOptions Icon={selected == 'Notification'? FaBell : FiBell }
                text='Notification'
                isActive={Boolean(selected == 'Notification')}
                setSelected={setSelected}
                />
                <SidebarOptions Icon={selected == 'Message'? HiMail : HiOutlineMail }
                text='Message'
                isActive={Boolean(selected == 'Message')}
                setSelected={setSelected}
                />
                <SidebarOptions Icon={selected == 'Bookmarks'? BsBookmarkFill : BsBookmark }
                text='Bookmarks'
                isActive={Boolean(selected == 'Bookmarks')}
                setSelected={setSelected}
                />
                <SidebarOptions Icon={selected == 'Lists'? RiFileList2Fill : FaRegListAlt }
                text='Lists'
                isActive={Boolean(selected == 'Lists')}
                setSelected={setSelected}
                />
                <SidebarOptions Icon={selected == 'Profile'? BsPersonFill : BsPerson }
                text='Profile'
                isActive={Boolean(selected == 'Profile')}
                setSelected={setSelected}
                redirect={'/profile'}
                />
                <SidebarOptions Icon={CgMoreO} text={'More'} setSelected={setSelected} />
                <div className={style.tweetButton} 
                onClick={()=> router.push(`${router.pathname}/?mint=${currentAccount}`)} 
                > Mint</div>
            </div>
            <div className={style.profileButton}>
                <div className={style.profileLeft}>
                    <img src={currentUser.profileImage} lat="profile" 
                    className={currentUser.isProfileImageNft ? `${style.profileImage} smallHex` : style.profileImage} 
                    />
                </div>
                <div className={style.profileRight}>
                    <div className={style.details}> 
                        <div className={style.name}>{currentUser.name}</div>
                        <div className={style.handle}>@{`${currentAccount.slice(0, 4)}....${currentAccount.slice(-4)} `}</div>
                    </div>
                    <div className={style.moreContainer}>
                        <FiMoreHorizontal/>
                    </div>

                </div>
            </div>

            <Modal isOpen={Boolean(router.query.mint)} 
            onRequestClose={() => {router.back()}} 
            style={customStyles} 
            >
                <ProfileImageMinter/>
            </Modal>
        </div>
    )
}

export default Sidebar