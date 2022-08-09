import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

	root: {
		display: 'flex',
		width: '100%',
		zIndex: 1,
		position: 'relative'
	  },
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		[theme.breakpoints.down('md')]: {
		  overflow: 'hidden'
		},
	  },
	  containerSide: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '100%',
		[theme.breakpoints.down('md')]: {
		  overflow: 'hidden'
		},
	  },
	paperWrap: {
		width:"550px",
		background:'#fff',
		padding: `${theme.spacing(3)}px ${theme.spacing(1)}px`,
		position: "absolute",
		top: "100px",
	},
	title: {
		color: theme.palette.primary.main,
		fontWeight: 700,
		fontSize: 20,
		[theme.breakpoints.down('sm')]: {
			fontSize: 24,
		},
		
	},
	title1: {
		color: theme.palette.primary.main,
		fontWeight: 700,
		fontSize: 20,
		textAlign:"center",
		[theme.breakpoints.down('sm')]: {
			fontSize: 24,
		},
		
	},
	label:{
      marginBottom:"10px"
	},
	spaninp: {

        color: "#f70404"
    },
	userFormWrap: {
		width: '100%',
		[theme.breakpoints.up('md')]: {
		  width: 720
		},
		[theme.breakpoints.down('sm')]: {
		  marginBottom: theme.spacing(3)
		},
	  },
	topBar: {
		width:480,
		display: 'flex',
		marginBottom: theme.spacing(2),
		paddingBottom: theme.spacing(1),
		marginLeft: 'auto',
		marginRight: 'auto',
		justifyContent: 'space-between',
		'& $icon': {
		  margin: `0 ${theme.spacing(1)}px`
		},
		[theme.breakpoints.down('sm')]: {
		  alignItems: 'center',
		  marginBottom: theme.spacing(3),
		}
	  },

	signArrow: {
		transform: theme.direction === 'rtl' ? 'rotate(180deg)' : 'none',
		[theme.breakpoints.down('md')]: {
		  display: 'none'
		}
	  },
	  buttonLink: {
		background: 'none',
		padding: 0,
		textTransform: 'none',
		transition: 'color ease 0.3s',
		fontWeight: theme.typography.fontWeightRegular,
		fontSize: '0.875rem',
		'&:hover': {
		  background: 'none',
		  color: theme.palette.primary.main
		}
	  },
	  centerContent:{
		
		width:480,
		marginBottom: theme.spacing(2),
		paddingBottom: theme.spacing(1),
		marginLeft: 'auto',
		marginRight: 'auto',
		justifyContent: 'space-between',
	  },
	formControl: {
		width: '100%',
		marginTop:"10px",
		marginBottom:"10px",
		borderRadius:"10px !important",
		marginBottbuttonLink: {
			background: 'none',
			padding: 0,
			textTransform: 'none',
			transition: 'color ease 0.3s',
			fontWeight: theme.typography.fontWeightRegular,
			fontSize: '0.875rem',
			'&:hover': {
				background: 'none',
				color: theme.palette.secondary.main
			}
		}, om: theme.spacing(1)
	},

	leftIcon: {
		marginRight: theme.spacing(1)
	  },
	  rightIcon: {
		marginLeft: theme.spacing(1)
	  },
	  iconSmall: {
		fontSize: 20,
	  },

	optArea: {
		display: 'flex',
		justifyContent: 'right',
		padding: `0 ${theme.spacing(0.5)}px`,
		marginTop:"10px",
		marginBottom:"10px"
	},
	btnArea: {
		display: 'flex',
		justifyContent: 'center',
		margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
		fontSize: 12,
		'& $label': {
		  fontSize: 12,
		  '& span': {
			fontSize: 12
		  }
		},
		'& button': {
		  margin: `0 ${theme.spacing(1)}px`
		},
		[theme.breakpoints.down('xs')]: {
		  flexDirection: 'column',
		  '& button': {
			width: '100%',
			margin: 5
		  }
		},
	  },
	  errorStyle:{
	color: '#FF0000',
    fontSize: '13px'
	  }
}));


export default useStyles