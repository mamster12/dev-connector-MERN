import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner';
import { getProfileByID } from '../../actions/profile';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileByID, profile: { profile, loading }, auth: { isAuthenticated, user }, match }) => {

    useEffect(() => {
        getProfileByID(match.params.id);
    }, [getProfileByID, match.params.id]);

    return (
        profile === null || loading ? <Spinner /> :
            <Fragment>
                <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
                {isAuthenticated && loading === false && user._id === profile.user._id &&
                    (<Link to="/edit-profile" className="btn btn-light"
                    ><i className="fas fa-user-circle text-primary"></i> Edit Profile</Link>)
                }
                <div className="profile-grid my-1">
                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />
                    <div className="profile-exp bg-white p-2">
                        <h2 className="text-primary">Experience</h2>
                        {profile.experience.length > 0 ? (
                            <Fragment>
                                {profile.experience.map(experience =>
                                    <ProfileExperience key={experience._id} experience={experience} />
                                )}
                            </Fragment>
                        ) : <em>No experience credentials.</em>}
                    </div>
                    <div className="profile-edu bg-white p-2">
                        <h2 className="text-primary">Education</h2>
                        {profile.education.length > 0 ? (
                            <Fragment>
                                {profile.education.map(education =>
                                    <ProfileEducation key={education._id} education={education} />
                                )}
                            </Fragment>
                        ) : <em>No education credentials.</em>}
                    </div>
                </div>

                <div className="profile-github">
                    <h2 className="text-primary my-1">
                        <i className="fab fa-github"></i> Github Repos
                        </h2>
                    {profile.githubusername ? (
                        <ProfileGithub username={profile.githubusername} />
                    ) : <em>No github repo credentials.</em>}
                </div>
            </Fragment>
    )
}

Profile.propTypes = {
    getProfileByID: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileByID })(Profile);