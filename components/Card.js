function Card() {
  return (
    <>
      {/* FrontSide */}
      <div className="myCard">
        <div className="innerCard">
          <div className="frontSide">
            <p className="url">URL Image</p>
            <p className="title">Big Dogs</p>
          </div>
          {/* BackSide */}
          <div className="backSide">
            <p className="title">Big Dogs</p>
            <p>Some Content</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
