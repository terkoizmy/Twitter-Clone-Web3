import Post from '../Post'
import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

// const tweets = [
//     {
//     displayName: 'Terkoiz',
//     userName: '0x5CbDc82605906d2fC422991310890B1bEcC8DC3D',
//     avatar: 'https://i.pinimg.com/564x/3a/73/b1/3a73b1f7a30b9e1a0d8ceb3c9aa99a1f.jpg',
//     text: 'gm',
//     isProfileImageNft: false,
//     timestamp: new Date()
//     },
//     {
//       displayName: 'Terkoiz',
//       userName: '0x5CbDc82605906d2fC422991310890B1bEcC8DC3D',
//       avatar: 'https://i.pinimg.com/564x/3a/73/b1/3a73b1f7a30b9e1a0d8ceb3c9aa99a1f.jpg',
//       text: 'gm',
//       isProfileImageNft: true,
//       timestamp: new Date()
//     },
//     {
//       displayName: 'Terkoiz',
//       userName: '0x5CbDc82605906d2fC422991310890B1bEcC8DC3D',
//       avatar: 'https://i.pinimg.com/564x/3a/73/b1/3a73b1f7a30b9e1a0d8ceb3c9aa99a1f.jpg',
//       text: 'gm',
//       isProfileImageNft: false,
//       timestamp: new Date()
//     }
//   ]

const ProfileTweets = () => {
  const {tweets, currentAccount, currentUser} = useContext(TwitterContext)
  console.log(currentAccount)
  return (
    <div className={style.wrapper}>
        {tweets?.map((tweet, index) => (
            <Post
            key={index}
            displayName={currentUser.name === 'Unnamed' ? currentUser.walletAddress : currentUser.name}
            userName={`${currentAccount.slice(0,4)}...${currentAccount.slice(-4)}`}
            text={tweet.tweet}
            avatar={currentUser.profileImage}
            isProfileImageNft={currentUser.isProfileImageNft}
            timestamp={tweet.timestamp}
            />
        ))}
    </div>
  )
}

export default ProfileTweets