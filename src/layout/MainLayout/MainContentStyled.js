// material-ui
import { styled } from '@mui/material/styles';

// project imports
import { drawerWidth } from 'store/constant';

// ==============================|| MAIN LAYOUT - STYLED ||============================== //

const MainContentStyled = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'borderRadius' && prop !== 'direction'
})(({ theme, open, borderRadius, direction }) => {
  const isRTL = direction === 'rtl';

  return {
    backgroundColor: theme.vars.palette.grey[100],
    minWidth: '1%',
    width: '100%',
    minHeight: 'calc(100vh - 88px)',
    flexGrow: 1,
    padding: 20,
    marginTop: 88,
    marginRight: isRTL ? 0 : 20,
    marginLeft: isRTL ? 20 : 0,
    borderRadius: `${borderRadius}px`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    ...(!open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter + 200
      }),
      [theme.breakpoints.up('md')]: {
        marginLeft: isRTL ? 20 : -(drawerWidth - 72),
        marginRight: isRTL ? -(drawerWidth - 72) : 20,
        width: `calc(100% - ${drawerWidth}px)`,
        marginTop: 88
      }
    }),
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.shorter + 200
      }),
      marginLeft: isRTL ? 20 : 0,
      marginRight: isRTL ? 0 : 20,
      marginTop: 88,
      width: `calc(100% - ${drawerWidth}px)`,
      [theme.breakpoints.up('md')]: {
        marginTop: 88
      }
    }),
    [theme.breakpoints.down('md')]: {
      marginLeft: 20,
      marginRight: 20,
      padding: 16,
      marginTop: 88,
      ...(!open && {
        width: `calc(100% - ${drawerWidth}px)`
      })
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: 10,
      marginRight: 10
    }
  };
});

export default MainContentStyled;
