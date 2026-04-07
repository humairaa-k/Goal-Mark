import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
  
  const IconFor = (name, color= '#fff') => {
    const props = { fontSize: 'small', sx: { color } };

    switch ((name || "").toLowerCase()) {
      case "target":
        return <EmojiEventsIcon {...props} />;
      case "star":
        return <StarIcon {...props} />;
      case "heart":
      case "favorite":
        return <FavoriteIcon {...props} />;
      case "book":
      case "menu":
        return <MenuBookIcon {...props} />; 
      case "money":
        return <AttachMoneyIcon {...props}/>;
      default:
        return <EmojiEventsIcon {...props} />;
    }
  };

  export default IconFor;