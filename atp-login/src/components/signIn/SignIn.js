import React, { useState, useEffect } from 'react';

import {
	Grid,
	TextField,
	Typography,
	Button,
	Dialog,
	//DialogActions,
	DialogContent,
	//DialogContentText,
	DialogTitle,
} from "@material-ui/core";
import { LocalStorageKeys } from "../../utils";
import { actions } from "frequencyscreen_v_dbinder";
import config from "../../utils/config";
import LocationRoles from "./locationRole";
import { useDispatch } from "react-redux";
import * as Yup from 'yup';

import Axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import md5 from "md5";
import withTheme from '../../themeProvider';
import withStyleFix from '../../stylefix';

const SignInValidationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Please enter a valid email address')
		.required('Please enter an email address'),
	password: Yup.string()
		.required('Please enter a password')
});

const useStyles = makeStyles((theme) => ({
	textInput: {
		height: 35,
	},
	fullHeight: {
		height: "100vh",
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
		backgroundColor: "#F3F6FF",
	},
	columnSection: {
		justifyContent: "center",
		display: "flex",
		width: 370,
		background: "#fff",
		padding: 18,
		borderRadius: "12px",
		boxShadow: "0px 5px 23px #00000014",
	},
	headerSection: {
		justifyContent: "center",
		display: "flex",
		alignItems: "center",
		marginBottom: 50,
		marginTop: 4,
	},
	rowView: {
		marginBottom: 20,
	},
	logo: {
		width: 50,
		height: 50,
		borderRadius: 100,
		marginRight: 20,
	},
	dialogPaper: {
		padding: 0,
	},
}));

const SignIn = (props) => {
	const classes = useStyles(props);
	const dispatch = useDispatch();
	const { basicRouters } = props;
	// const practitonerDetails = useSelector(
	//   (state) => state?.signInReducerApiSlice?.getPractitonerData?.data
	// );
	const [practitonerDetails, setPractionerRole] = React.useState([]);
	const [state, setState] = useState({
		email_id: "",
		password: "",
		error: {
			email_id: "",
			password: "",
		},
		message: "",
	});

	const [open, setOpen] = React.useState(false);

	const [loginData, setLoginData] = React.useState();
	const [practitonerId, setPractitonerId] = React.useState(null);
	const [person_id, setPerson_id] = React.useState(null); // Holds the person _id
	const [personId, setPersonId] = React.useState(0); // Holds the personId

	// Handle Open Click
	const handleClickOpen = () => {
		setOpen(true);
	};

	// const handleClose = () => {
	//   setOpen(false);
	// };
	const handleSubmit = async (logindata) => {
		localStorage.setItem("token", btoa(JSON.stringify(logindata || loginData)));

		const userData = await dispatch(
			actions.SEARCH_PRACTIONER({
				email: state.email_id,
			})
		);

		// const permissionValue = await dispatch(
		//   actions.GET_PERMISSION_ROLE_DATA({
		//     id: userData?.payload?.data?.[0]?.practitioner?.[0]
		//       ?.PractitionerRole?.[0]?.code?.[0]?.id,
		//   })
		// );

		let userInfoKeys = JSON.parse(atob(localStorage.getItem("userInfoKeys")));

		const permissionValue = await dispatch(
			actions.PERMISSION_ROLES({
				id: userInfoKeys?.role?.role?.[0]?._id,
			})
		);
		//await dispatch(actions.GETQUEUELIST());

		if ((permissionValue?.payload?.data.Result.length || 0) === 0) {
			alert("Role Permission Not Mapped!. Please contact your admin.");
			localStorage.clear();
			return;
		}
		try {
			let Arr = [];
			let pageJson =
				permissionValue?.payload?.data.Result?.[0]?.permission?.[0]
					?.permissionRepoAccess;
			localStorage.setItem("permissionData", btoa(JSON.stringify(pageJson)));

			// let Pages = Object.keys(pageJson)?.filter(
			//   (v) =>
			//     v && (pageJson[v]?.permission.read || pageJson[v]?.permission.write)
			// );
			let extraRoute = [];
			//et permissionJson = [];
			pageJson.forEach((v) => {
				//permissionJson.push(v.permissionRepo?.rep_name);
				let repo = {
					repoName: v.permissionRepo?.rep_name,
					rep_type: v.permissionRepo?.rep_type,
					route_url: v.permissionRepo?.route_url ?? "",
					unique_id: v.permissionRepo?.unique_id,
					projectid: v.permissionRepo?.projectid,
					_id: v?.permissionRepo?._id,
					permsndelete: v?.permsndelete,
					permsnread: v?.permsnread,
					permsnupdate: v?.permsnupdate,
					permsnwrite: v?.permsnwrite,
				};
				Arr.push(repo ?? "");
				if (
					v.permissionRepo?.route_url &&
					v?.permsndelete &&
					v?.permsnread &&
					v?.permsnupdate &&
					v?.permsnwrite
				) {
					extraRoute.push(v.permissionRepo?.route_url);
				}
			});

			let basicRoute = basicRouters;
			basicRoute = basicRoute.filter((val) => extraRoute.indexOf(val) > -1);

			const permission = {
				[userInfoKeys?.role?.role?.[0]?.display?.toLowerCase()]: {
					permission: [...Arr],

					accessedRouters: [...extraRoute],
				},
			};
			localStorage.setItem("defaultLng", "en");
			localStorage.setItem(
				"role_name",
				userInfoKeys?.role?.role?.[0]?.display?.toLowerCase()
			);
			localStorage.setItem(
				"loginUserName",
				userData?.payload?.data?.[0]?.name?.[0]?.text ?? "CLMM User"
			);

			localStorage.setItem("role_data", btoa(JSON.stringify(permission)));

			localStorage.setItem("payload", JSON.stringify(logindata || loginData));
			if (basicRoute.length > 0) {
				// props.history.push({
				// 	pathname: basicRoute[0],
				// });
				window.location.href = basicRoute[0]
			} else {
				alert("Something went wrong. Please contact your admin.")
				localStorage.clear();
			}
		} catch (e) {
			console.log("=====================================================================")
			console.log(e)
			console.log("=====================================================================")
		 }

		//localStorage.setItem("token", btoa(JSON.stringify(keyClock?.data)));
		// let basicRoute = basicRouters;
		// props.history.push({
		//   pathname: basicRoute[0],
		// });
	};

	useEffect(() => {
		if (localStorage.getItem("payload")) {
			try {
				let basicRoute = basicRouters;
				let data = localStorage.getItem("role_data");
				const accessObj =
					JSON.parse(atob(data))?.[localStorage.getItem("role_name")] || [];

				basicRoute = basicRoute.filter(
					(val) => accessObj?.accessedRouters?.indexOf(val) > -1
				);
				if (basicRoute.length > 0) {
					// props.history.push({
					// 	pathname: basicRoute[0],
					// });
					window.location.href = basicRoute[0]
				} else {
					alert("Something went wrong. Please contact your admin.")
				}
			} catch (e) {
				localStorage.removeItem("token");
				localStorage.removeItem("role_name");
				localStorage.removeItem("role_data");
				// localStorage.clear()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const validate = () => {
		let isValidated = true;

		if (!state.email_id) {
			isValidated = false;
			state.error.email_id = "Enter email id";
		}

		if (!state.password) {
			isValidated = false;
			state.error.password = "Enter password";
		}

		setState({ ...state });
		return isValidated;
	};

	// Handle On Login Click
	const handleLogin = async () => {
		// Validate the form data
		if (!validate()) {
			return false;
		}

		// Prepare the params for the NIFI API
		let params = {
			username: state.email_id,
			password: state.password,
		};
		var myHeaders = { "Content-Type": "text/plain" };
		var encoded = btoa(JSON.stringify(params));
		var requestOptions = {
			method: "POST",
			headers: myHeaders,
			data: encoded,
			url: `${config.nifiUrl}/api/v1/orgUserSignIn`,
		};

		// Call the NIFI API
		let keyClock = await Axios(requestOptions).catch((error) => {
			setState({
				...state,
				message: "Invalid Credentials",
			});
		});
		// Check if the API call was successful
		if (!keyClock || keyClock?.data?.error) {
			alert("Please try agin later")
			localStorage.clear();
			return;
		} else {
			// If the API call was successful, set the loginData state

			setLoginData(keyClock?.data);
		}

		// Call the get Practitioner API using the email id from loginData
		const userData = await dispatch(
			actions.SEARCH_PRACTIONER({
				email: state.email_id,
			})
		);

		// Check if the API call was successful
		if (
			!userData?.payload?.data?.[0]?.practitioner?.[0]?.PractitionerRole
				.length > 0
		) {
			alert("Something went wrong. Please contact your admin.")
			localStorage.clear();
			return;
		}

		// Set the State with the data from the API call
		setPractitonerId(userData?.payload?.data?.[0]?.practitioner?.[0]?._id);
		setPerson_id(userData?.payload?.data?.[0]?._id);
		setPersonId(userData?.payload?.data?.[0]?.practitioner?.[0]?.PersonID);

		const userPreference = await dispatch(
			actions.READ_USER_PREFERENCE({
				personId: userData?.payload?.data?.[0]?.Id,
			})
		);

		// Hit the getPractitionerRole API to get the roles of the practitioner
		let practitioner_role = await dispatch(
			actions.GetPractionerRole({
				id: userData?.payload?.data?.[0]?.practitioner?.[0]?._id,
			})
		);

		// Check if the API call was successful and set the state with the data
		if (practitioner_role?.payload?.data) {
			setPractionerRole(practitioner_role?.payload?.data?.result ?? []);

			// Check if any preference has been already saved in database.
			const userPreferenceData = userPreference?.payload?.data?.result;

			if (userPreferenceData?.length > 0) {
				const userPreferenceObj = [...userPreferenceData]?.pop()
					?.userpreference;

				onNextClick(
					userPreferenceObj?.location,
					userPreferenceObj?.facility,
					userPreferenceObj?.org,
					userPreferenceObj?.enterprise,
					userPreferenceObj?.role,
					userPreferenceObj?.practitionerCode,
					userPreferenceObj?.practitioner,
					userPreferenceObj?.personid,
					userData?.payload?.data?.[0]?.Id,
					true,
					keyClock?.data
				);
			} else {
				// Handle the next state of the dialog to allow user to choose the Role, Enterprise, organization, facility, and location
				handleClickOpen();
			}
		}

		// await dispatch(
		//   actions.GETPRACTITIONER_DATA({
		//     id: userData?.payload?.data?.[0]?.practitioner?.[0]?._id,
		//   })
		// );
	};

	const keydownFunc = (event, sectionId) => {
		if (event.keyCode === 13) {
			handleLogin();
		}
	};

	const UserInfo = (
		location,
		facilitystate,
		organisation,
		enterprise,
		rolestate,
		code,
		practitionerid,
		personid
	) => {
		switch (code) {
			case "OT001":
				return {
					roleid: rolestate?._id,
					facilityid: facilitystate?._id,
					locationid: location?._id,
					orgid: organisation?._id,
					enterpriseid: enterprise?._id,
					practitionerid: practitionerid,
					personid: personid,
				};
			case "OT002":
				return {
					roleid: rolestate?._id,
					facilityid: facilitystate?._id,
					locationid: location?._id,
					orgid: organisation?._id,
					enterpriseid: organisation?.ParentOrgID?._id,
					practitionerid: practitionerid,
					personid: personid,
				};
			case "OT003":
				return {
					roleid: rolestate?._id,
					facilityid: facilitystate?._id,
					locationid: location?._id,
					orgid: facilitystate?.ParentOrgID?._id,
					enterpriseid: facilitystate?.Parentofparent?.[0]?._id,
					practitionerid: practitionerid,
					personid: personid,
				};
			default:
				return null;
		}
	};

	const userInfoKeys = (
		location,
		facilitystate,
		organisation,
		enterprise,
		rolestate,
		code,
		practitionerid,
		personid
	) => {
		switch (code) {
			case "OT001":
				return {
					role: rolestate,
					facility: facilitystate,
					location: location,
					org: organisation,
					enterprise: enterprise,
					practitioner: practitionerid,
					personid: personid,
				};
			case "OT002":
				return {
					role: rolestate,
					facility: facilitystate,
					location: location,
					org: organisation,
					enterprise: organisation?.ParentOrgID,
					practitioner: practitionerid,
					personid: personid,
				};
			case "OT003":
				return {
					role: rolestate,
					facility: facilitystate,
					location: location,
					org: facilitystate?.ParentOrgID,
					enterprise: facilitystate?.Parentofparent?.[0],
					practitioner: practitionerid,
					personid: personid,
				};
			default:
				return null;
		}
	};

	const onNextClick = async (
		location,
		facilitystate,
		organisation,
		enterprise,
		rolestate,
		practitionerCode,
		practitionerid,
		personid,
		uniquePersonId,
		shouldSkipSavePreference,
		logindata
	) => {
		let params = UserInfo(
			location,
			facilitystate,
			organisation,
			enterprise,
			rolestate,
			practitionerCode,
			practitionerid,
			personid
		);
		let keys = userInfoKeys(
			location,
			facilitystate,
			organisation,
			enterprise,
			rolestate,
			practitionerCode,
			practitionerid,
			personid
		);

		params.apikey = config.TokenApikey;
		let CheckSum = md5(JSON.stringify(params));
		delete params.apikey;
		params.CheckSum = CheckSum;

		// Adding personId in userInfoKeys localstorage
		keys = {
			...keys,
			personId: uniquePersonId,
		};

		let Generated_Token = await dispatch(
			actions.GET_TOKEN({
				params,
			})
		);

		if (params && keys) {
			localStorage.setItem("userInfo", Generated_Token?.payload?.data?.Result);
			localStorage.setItem("userInfoKeys", btoa(JSON.stringify(keys)));
			await dispatch(
				actions.LOGGED_USER_INFO({
					params,
					keys,
				})
			);

			if (!shouldSkipSavePreference) {
				saveUserPreferences({
					...keys,
					practitionerCode,
				});
			}
			const orgFormat = await dispatch(
				actions.GET_DATE_FORMAT_USING_FACILITY_ID({
					facilityId: facilitystate?._key,
				})
			);

			localStorage.setItem(
				"orgFormat",
				JSON.stringify(orgFormat?.payload?.data?.result?.[0])
			);

			handleSubmit(logindata);
		} else {
			alert("UserInfo not available! Please Contact Admin")
		}
	};

	const saveUserPreferences = (data) => {
		const payload = {
			username: state.email_id,
			email: state.email_id,
			realmRoles: [],
			origin: "",
			id: "",
			is_active: true,
			role_mapping: {},
			personid: personId,
			userpreference: {
				...data,
			},
		};

		Promise.resolve(dispatch(actions.SAVE_USER_PREFERENCE(payload)))
			.then((res) => console.log("Successfully saved user preference"))
			.catch((error) =>
				console.error(`Error Occured in SAVE_USER_PREFERENCE: ${error}`)
			);
	};


	return (
		<Container component="main">
			<CssBaseline />

			<div className={classes.fullHeight}>
				<Grid container className={classes.columnSection}>
					<Grid></Grid>
					<Grid item xs={12} className={classes.headerSection}>
						<Typography variant="h6" color="primary">
							CLMM
							<span style={{ paddingLeft: 5, fontSize: 10 }}>
								v: {localStorage.getItem(LocalStorageKeys.version)}
							</span>
						</Typography>
					</Grid>

					<Grid item xs={12} sm={12} md={12}>
						<div className={classes.rowView}>
							<TextField
								fullWidth
								label="Email Id"
								variant="standard"
								value={state.email_id}
								placeholder={"clmm@example.com"}
								error={state.error.email_id}
								helperText={state.error.email_id}
								onChange={(e) =>
									setState({
										...state,
										email_id: e.target.value,
										error: { ...state.error, email_id: "" },
										message: "",
									})
								}
							/>
						</div>

						<div className={classes.rowView}>
							<TextField
								fullWidth
								variant="standard"
								label="Password"
								type="password"
								InputLabelProps={{
									shrink: true,
								}}
								InputProps={{
									className: classes.textInput,
								}}
								value={state.password}
								placeholder={"Password"}
								error={state.error.password}
								onKeyDown={(e) => keydownFunc(e)}
								helperText={state.error.password}
								onChange={(e) =>
									setState({
										...state,
										password: e.target.value,
										error: { ...state.error, password: "" },
										message: "",
									})
								}
							/>
						</div>

						<div>
							<Typography
								variant="body1"
								gutterBottom
								align="center"
								color="error"
							>
								{state.message}
							</Typography>
						</div>

						<div className={classes.rowView}>
							<Button
								variant="contained"
								color="primary"
								fullWidth
								// disabled={loading}
								onClick={handleLogin}
							>
								Log In
							</Button>
						</div>
					</Grid>
				</Grid>

				{/* //Dialog for Roles and Location //*/}

				<Dialog
					open={open}
					// onClose={handleClose}
					classes={{ paper: classes.dialogPaper }}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title" style={{ paddingBottom: "0px" }}>
						Select Location and Role
					</DialogTitle>
					<DialogContent
						style={{
							padding: "0px",
							paddingBottom: "10px",
							paddingRight: "20px",
						}}
					>
						{/* <LocationRoles
            practitonerDetails={practitonerDetails}
            onNextClick={onNextClick}
          /> */}
						<LocationRoles
							//practitonerDetails={practitonerDetails}
							practitonerId={practitonerId}
							person_id={person_id}
							onNextClick={onNextClick}
						/>
					</DialogContent>
					{/* <DialogActions>
          <Button onClick={handleSubmit} color="primary" autoFocus 
          disabled>
            Next
          </Button>
        </DialogActions> */}
				</Dialog>
			</div>
		</Container>
	)

}


export default withStyleFix(withTheme((SignIn)))