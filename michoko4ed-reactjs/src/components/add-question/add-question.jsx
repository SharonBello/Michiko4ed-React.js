import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveQuestion } from '../../store/actions/set.actions.js'
import { cloudinaryService } from '../services/cloudinary.service.js'
import { userService } from '../../services/user.service.js'

class _AddQuestion extends React.Component {
  state = {
    questionContent: {
      imgUrl: [],
      questionDescription: '',
      questionTitle: '',
      type: '',
      correct: false,
      incorrect: false,
    },
  }

  handleChange = (ev) => {
    const { target } = ev
    const field = target.name
    let value = (field === 'price' || field === 'dayToMake') ? +target.value : target.value
    if (field === 'imgUrl' && value) {
      this.uploadImg(ev)
      this.setState(prevState => ({ ...prevState, isImg: true }))
      return
    }
    this.setState(prevState => ({ questionContent: { ...prevState.questionContent, [field]: value } }))
  }

  uploadImg = (ev) => {
    const CLOUD_NAME = cloudinaryService.getCloudName()
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', cloudinaryService.getPreset());

    return fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {

      this.setState(prevState => ({ questionContent: { ...prevState.questionContent, imgUrl: [res.url] } }))
    }).catch(err => console.error(err))
  }

  handleSubmit = (ev) => {
    ev.preventDefault()
    this.props.saveQuestion(this.state.questionContent)
    this.setState({
      questionContent: {
        imgUrl: '',
        questionDescription: '',
        questionTitle: '',
        type: '',
        correct: false,
        incorrect: false,
        user: this.props.loggedInUser
      }
    })
    const user = this.props.loggedInUser
    userService.saveLocalUser(user)
    this.props.navigation('/')
  }

  render() {
    const { questionContent, isImg } = this.state
    return (
      <main className="header-container container">
        <div className="progress-bar-container container">
          <div className="inner-progress-wrapper">
            <nav>
              <button className="personal_info active">
                <span className="">1</span>Personal Info</button>
              <button className="professional_info disabled">
                <span className="">2</span>Professional Info</button>
              <button className="Question Details disabled">
                <span className="">3</span>Question Details</button>
            </nav><div className="completion-score incomplete">
              <div className="text">Completion Rate: 15%</div>
              <div className="full-width-progressbar">
                <div className="progress-bar-completion-indicator"><span className="" style={{ width: '15%' }}>
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="add-question-container">
          <div className="question-details">

            <section className="add-question">
              <form className="question-form" onSubmit={this.handleSubmit}>

                <div className="question-details-header"><h2>Question Content</h2>
                  <p>Tell us a bit about yourself. This information will appear on your public profile,<br></br>so that potential buyers can get to know you better.</p>
                </div>

                <div className="question-image-upload">
                  <aside className="">
                    <h3>
                      <span className="add-question-titles">Picture (optional)</span>
                      <div className="popup-text">Add pictures of your question so customers will know exactly what they'll be getting.</div>
                    </h3>
                  </aside>

                  <div className="img-content">
                    <section className="question-photos">
                      <label className='file-img' />
                      {!isImg ? <span className="missing-question-image"></span> : <img src={`${questionContent.imgUrl}`} alt="" />}

                      <input className='file-input' accept="image/png,image/jpeg" type={'file'} name="imgUrl" value={''} onChange={this.handleChange} />
                    </section>
                  </div>
                </div>

                <div className="add-question-titles">
                  <p className="add-question-labels">Question Title</p>
                  <label>
                    <textarea maxLength="600" minLength="15" rows={5} cols={50} id='title' placeholder="I will..." value={questionContent.questionTitle} onChange={this.handleChange} >
                    </textarea></label>
                </div>

                <div id="description" className="onboarding-field is-required">
                  <br></br>
                  <div className="add-question-titles">
                    <p className="add-question-labels">Description (min. 15 characters)</p>
                    <label className="description">
                      <textarea maxLength="600" minLength="15" rows={5} cols={50} placeholder="Share a bit about the question, cool related, and your area of expertise.">
                      </textarea></label>

                  </div>
                </div>
                <br></br>
                <div className='add-question-titles'>
                  <p className="add-question-labels">Tell us a bit about yourself. This information will appear on your public profile, so that potential buyers can get to know you better.</p>
                  <label className="description">
                    <textarea maxLength="600" minLength="15" rows={5} cols={50} className='desc' required type={'txt'} name='questionDescription' value={questionContent.questionDescription} onChange={this.handleChange}>
                    </textarea></label>
                </div>
                <br></br>

                <div className='add-question-titles'>
                  <p className="add-question-labels">Type</p>
                  <select className='add-question-input' value={questionContent.type} name="type" onChange={this.handleChange}>
                    <option value=""></option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">Yes/No</option>
                  </select>
                </div>
                <br></br>


                <button className='add-question-btn' type='submit'>Add Question</button>
              </form>
            </section>
          </div>
        </section>
      </main>
    )
  }
}

export const AddQuestionWrapper = (props) => {
  const navigation = useNavigate()
  return <AddQuestion navigation={navigation} />
}

const MapStateToProps = (storeState) => {
  return {
    loggedInUser: storeState.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  saveQuestion,
}

export const AddQuestion = connect(
  MapStateToProps,
  mapDispatchToProps
)(_AddQuestion)