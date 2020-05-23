require('dotenv').config()
const bbb = require('../')

let api = bbb.api(process.env.BBB_URL, process.env.BBB_SECRET)

let meetingCreateUrl = api.administration.create('My Meeting', '1', {
  duration: 2,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
})

bbb
  .http(meetingCreateUrl)
  .then((result) => {
    console.log(result)

    let moderatorUrl = api.administration.join('moderator', '1', 'supersecret')
    let attendeeUrl = api.administration.join('attendee', '1', 'secret')
    console.log(
      `Moderator link: ${moderatorUrl}\nAttendee link: ${attendeeUrl}`
    )

    let meetingEndUrl = api.administration.end('1', 'supersecret')
    console.log(`End meeting link: ${meetingEndUrl}`)
  })
  .catch(console.log)

let options = {
  record: false,
  duration: 2,
  attendeePW: 'secret',
  moderatorPW: 'supersecret',
}

let meeting = api.administration.create('Test Meeting', '1', options)

let moderator = api.administration.join('Moderator', '1', 'supersecret')
let attendee = api.administration.join('Attendee', '1', 'secret')

let meetingInfo = api.monitoring.getMeetingInfo('1')
let meetings = api.monitoring.getMeetings()

console.log(meeting, moderator, attendee, meetingInfo, meetings)
