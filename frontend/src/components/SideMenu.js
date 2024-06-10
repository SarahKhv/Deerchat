function SideMenu() {
    const classes = useStyles();
  
    return (
      <Drawer
        open={true}
        variant='permanent'
        anchor='right'
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Grid container justify='center' alignItems='center'>
          <Avatar
            src='https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg'
            className={classes.bigAvatar}
          />
        </Grid>
        <List>
          {['Profile', 'Sign Out'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <AccountCircle /> : <ExitToApp />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
  
  export default SideMenu;