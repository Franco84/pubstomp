import React, { Component } from 'react';
import { connect } from 'react-redux'

import { uploadAvatar } from '../actions'

class UploadAvatar extends Component {

  handleChangeImage () {
    const _this = this;
    let file = _this.refs.image.files[0]
    let reader = new FileReader()
    let url = reader.readAsDataURL(file)
  
    reader.onloadend = function (e) {
      const image = reader.result;
      _this.props.uploadAvatar({ avatar: image }, 1)
    }
  }
  
  render() {

    return (
      <div className='upload-avatar-container'>
        {
          'avatar_url' in this.props.profile ? 
            <img src={`http://localhost:8080/${this.props.profile.avatar_url}` } alt='img' /> 
            : <img src={ 'https://s.gravatar.com/avatar/c4908feb96d721ff05f1c1374913ffef?size=100&default=retro' } alt='imgnn' />
        }
        <input type="file"
          className="upload-avatar-image-input"
          ref="image"
          accept="image/*"
          onChange={this.handleChangeImage.bind(this)} 
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user,
    profile: state.profile
  }
}

export default connect(mapStateToProps, { uploadAvatar } )(UploadAvatar)

