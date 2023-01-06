import { BsStars } from 'react-icons/bs'
import TweetBox from './TweetBox'
import Post from '../Post'
import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'

const style = {
    wrapper: `flex-[2] border-r border-l border-[#38444d]`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`
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

const Feed = () => {
    const { tweets } = useContext(TwitterContext)
    // console.log(tweets[0].author)

    return(
        <div className={style.wrapper}>
            <div className={style.header}>
                <div className={style.headerTitle}> Home </div>
                <BsStars/>
            </div>
            <TweetBox/>
            {
                tweets.map((tweet, index) => (
                    <Post 
                    key={index}  
                    displayName={tweet.author.name}
                    userName={`${tweet.author.walletAddress.slice(0, 4)}....${tweet.author.walletAddress.slice(-4)} `}
                    avatar={tweet.author.profileImage}
                    text={tweet.tweet}
                    isProfileImageNft={tweet.author.isProfileImageNft}
                    timestamp={tweet.timestamp}
                    />
                ))
            }
        </div>
    )
}

export default Feed