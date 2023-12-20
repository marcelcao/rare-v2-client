// function Card() {
//   return (
//     <>
//       {/* FrontSide */}
//       <div className="myCard" style={{ cursor: 'pointer' }}>
//         {isCurrentUserPost ? (
//           <Button className="delete-btn" onClick={deleteThisPost}>
//             x
//           </Button>
//         ) : null}
//         <div className="innerCard">
//           <div className="frontSide">
//             <p className="url"><Image className="post-img" src={obj.image_url} alt={obj.title} style={{ width: 'auto', height: 'auto' }} /></p>
//             <p className="title"><Link href={`/posts/${obj.id}`} passHref>
//               <Card.Text className="post-title-link">{obj.title}</Card.Text>
//                                  </Link>
//             </p>
//           </div>
//           {/* BackSide */}
//           <div className="backSide">
//             <p className="title"><Card.Text className="post-user-link">
//               by {obj.rare_user.first_name} {obj.rare_user.last_name}
//                                  </Card.Text>
//             </p>
//             <p><Card.Text className="post-date">Posted on: {obj.publication_date}</Card.Text>
//               <Card.Text className="comment-count"> {obj.comment_count} Comments</Card.Text>
//             </p>
//           </div>
//         </div>
//       </div>
//       <Button
//         className="view-btn"
//         onClick={() => {
//           router.push(`/posts/${obj.id}`);
//         }}
//       >
//         View Post
//       </Button>
//     </>
//   );
// }

// export default Card;
