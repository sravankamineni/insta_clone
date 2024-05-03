// import {Link} from 'react-router-dom'
// import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

import Header from '../Header'

import PostItem from '../PostItem'
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class Home extends Component {
  state = {
    usersList: [],
    postsList: [],
  }

  componentDidMount() {
    this.getUsersList()
    this.getPosts()
  }

  getUsersList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.users_stories.map(eachData => ({
        storyUrl: eachData.story_url,
        userId: eachData.user_id,
        userName: eachData.user_name,
      }))

      // console.log(updatedData)

      this.setState({usersList: updatedData})
    }
  }

  getPosts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const postData = await response.json()
      const updatedPostsData = postData.posts.map(eachData => ({
        comments: {
          comment: eachData.comments.comment,
          userId: eachData.comments.user_id,
          userName: eachData.comments.user_name,
        },
        createdAt: eachData.created_at,
        userName: eachData.user_name,
        likesCount: eachData.likes_count,
        postDetails: {
          caption: eachData.post_details.caption,
          imageUrl: eachData.post_details.image_url,
        },
        postId: eachData.post_id,
        profilePic: eachData.profile_pic,
        userId: eachData.userId,
        postUserName: eachData.user_name,
      }))

      this.setState({postsList: updatedPostsData})
    }
  }

  renderSlider = () => {
    const {usersList} = this.state
    // console.log(usersList)
    return (
      <Slider {...settings}>
        {usersList.map(eachUser => {
          const {storyUrl, userId, userName} = eachUser
          return (
            <div className="slick-item" key={userId}>
              <img className="logo-image" src={storyUrl} alt="company logo" />
              <p className="user-name">{userName}</p>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    const {postsList} = this.state
    console.log(postsList)
    return (
      <>
        <Header />
        <div className="home-cont">
          <div className="main-container">
            <div className="slick-container">{this.renderSlider()}</div>
          </div>

          <ul className="all-posts">
            {postsList.map(eachPost => (
              <PostItem key={eachPost.postId} allPostDetails={eachPost} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Home
