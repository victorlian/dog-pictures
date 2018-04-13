import React from 'react';

import API from '../../api';
import styles from './Dogs.css';

export default class Dogs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breed: "Corgi",
      posts: []
    };
  }

  componentDidMount() {
    const urlEnd = window.location.pathname.split('/').pop();
    const breed = urlEnd.indexOf('breed') < 0 ? urlEnd : '';

    this.setState({ breed });
    API.getTopDogPictures(breed).then((posts) => {
      this.setState({ posts });
    });
  }

  render() {
    const images = this.state.posts;
    const dogImages = (images) ? (
      images.map(function(post, index) {
        return (
          <img key={index} src={post} className={styles.image} alt="doggos" />
        )
      })
    ) : (
      <h1>No Images :(</h1>
    )

    return (
      <section>
        <center>
          <h1 className={styles.title}>{decodeURI(this.state.breed)}</h1>
          {dogImages}
        </center>
      </section>
    );
  }
}