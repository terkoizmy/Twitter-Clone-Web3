import {createContext, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import {client} from '../lib/client'

export const TwitterContext = createContext()

export const TwitterProvider = ({children}) => {
    const router = useRouter()
    const [appStatus, setAppStatus] = useState('loading')
    const [currentAccount, setCurrentAccount] = useState('')
    const [tweets, setTweets] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    useEffect(() => {
      checkIfWalletIsConnected()
    }, [])

    useEffect(() => {
        if (!currentAccount && appStatus == 'connected') return
        getCurrentUserDetails(currentAccount)
        fetchTweets()
      }, [currentAccount, appStatus])
    
    const checkIfWalletIsConnected = async () => {
        if (!window.ethereum) return setAppStatus('noMetaMask')
        try {
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            if(addressArray.length > 0){
                setAppStatus('connected')
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            }else{
                router.push('/')
                setAppStatus('notConnected')
            }   
        }catch(err){
            router.push('/')
            setAppStatus('error')
        }
    }

    const connectToWallet = async () => {
        if(!window.ethereum) return setAppStatus('noMetaMask')
        try{
            setAppStatus('loading')
            const addressArray = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            
            if(addressArray.length > 0){
                setCurrentAccount(addressArray[0])
                createUserAccount(addressArray[0])
            }else{
                router.push('/')
                setAppStatus('notConnected')
            }

        }catch(err){
            router.push('/')
            setAppStatus('error')
        }
    }

    const createUserAccount = async (userWalletAddress = currentAccount) => {
        if(!window.ethereum) return setAppStatus('noMetaMask')
        try{
            const userDoc = {
                _type: 'users',
                _id: userWalletAddress,
                name: 'Unnamed',
                isProfileImageNft: false,
                profileImage: 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg',
                walletAddress: userWalletAddress
            }
            await client.createIfNotExists(userDoc) //create if doesnt exist
        }catch(err){
            router.push('/')
            setAppStatus('error')
        }
    }

    const getProfileImageUrl = async (imageUri, isNft) =>{
        if (isNft){
            return `https://gateway.pinata.cloud/ipfs/${imageUri}`
        } else {
            return imageUri
        }
    }

    const fetchTweets = async () => {
        const query = `
            *[_type == "tweets"]{
                "author": author->{name, walletAddress, profileImage, isProfileImageNft},
                tweet,
                timestamp
            }|order(timestamp desc)
        `

        const sanityResponse = await client.fetch(query)

        setTweets([])

        sanityResponse.forEach(async (items) => {
            const profileImageUrl = await getProfileImageUrl(items.author.profileImage, items.author.isProfileImageNft)

            const newItem = {
                tweet: items.tweet,
                timestamp: items.timestamp,
                author: {
                    name: items.author.name,
                    walletAddress: items.author.walletAddress,
                    isProfileImageNft: items.author.isProfileImageNft,
                    profileImage: profileImageUrl
                }
            }
            setTweets((prevState) => [...prevState, newItem])
        });
    }

    const getCurrentUserDetails = async (userAccount = currentAccount) => {
        if (appStatus !== 'connected') return

        const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "tweets": tweets[]->{timestamp, tweet}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }`
      
      const sanityResponse = await client.fetch(query)
      

      const profileImageUrl = await getProfileImageUrl(
        sanityResponse[0].profileImage,
        sanityResponse[0].isProfileImageNft
      )

      setCurrentUser({
        tweets: sanityResponse[0].tweets,
        name: sanityResponse[0].name,
        profileImage: profileImageUrl,
        isProfileImageNft: sanityResponse[0].isProfileImageNft,
        coverImage: sanityResponse[0].coverImage,
        walletAddress: sanityResponse[0].walletAddress
      })

    }

    

    return (
        <TwitterContext.Provider 
        value={{appStatus, currentAccount, connectToWallet, fetchTweets, tweets, currentUser, getCurrentUserDetails }}>
            {children}
        </TwitterContext.Provider>
    )
}