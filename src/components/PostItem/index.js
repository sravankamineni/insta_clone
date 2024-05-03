import './index.css'

const PostItem = props => {
  const {allPostDetails} = props
  const {
    comments,
    createdAt,
    userName,
    likesCount,
    postDetails,
    postId,
    profilePic,
    userId,
    postUserName,
  } = allPostDetails

  return (
    <li className="post-item">
      <div className="post-top">
        <div className="post-top-user">
          <img
            alt="post author profile"
            className="profile-pic"
            src={profilePic}
          />
          <p>{userName}</p>
        </div>
      </div>
    </li>
  )
}
export default PostItem
