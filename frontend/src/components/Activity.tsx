import styles from "../styles/Activity.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Activity as ActivityModel } from "../models/activity";

const Activity = ({ activity }: { activity: ActivityModel }) => {
  const { activityType, participants } = activity;

  return (
    <Card className={styles.activityCard} sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {activityType}
        </Typography>
        <Typography variant="body2">
          {`Participants: ${participants}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default Activity;
