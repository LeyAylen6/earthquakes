import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import Paper from "@mui/material/Paper";
import { useLocation } from "react-router";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useMemo, useState } from "react";
import { detailItems } from "./constants";
import { Comment, DetailItem } from "./interfaces";
import styles from "./detail.module.css"
import { createCommentByFeatureId, getCommentsByFeatureId } from "../../services/earthquakesAPI";

const Detail: React.FC = () => {
    const { feature } = useLocation().state;

    const [comments, setComments] = useState<Comment[]>([])
    const [comment, setComment] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value)
    }

    const createNewComment = async () => {
        const response = await createCommentByFeatureId(feature.id, comment)
        if (response.status == 201) setSuccess(true)
        setComments([response.data, ...comments])
        setComment("")
        setTimeout(() => setSuccess(false), 1000)
    }

    useEffect(() => {
        getCommentsByFeatureId(feature.id)
            .then((data) => setComments(data))
    }, [])

    const detailItemsMemo = useMemo(() => detailItems(feature), [feature])

    return (
        <Box display="flex" justifyContent="space-evenly" height="100%">

            <Paper elevation={6} sx={{ width: "55%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "start", pl: 7, pr: 3 }} >
                {detailItemsMemo.map((item: DetailItem) =>
                    item.title == "title"
                        ? <Typography variant="h4" key={item.title}>{item.ubication}</Typography>
                        : (
                            <Box display="flex" key={item.title}>
                                <Typography variant="h6">{item.title}</Typography>
                                <Chip label={item.ubication} color={item.color} size="small" sx={{ fontWeight: "bold", fontSize: "1.2rem", mt: .5 }} />
                            </Box>
                        )
                )}
            </Paper>

            <Box className={styles.containerComments}>
                <Typography variant="h4" color="primary">Comments</Typography>
                <Box>
                    <Box className={styles.makeComment}>
                        <TextField id="comment" label="Make a comment" variant="outlined" value={comment} onChange={handleChange} sx={{ width: "85%", mr: 2 }} />
                        <Button
                            variant={!success ? "outlined" : "contained"}
                            color={!success ? "primary" : "success"}
                            onClick={createNewComment}
                            disabled={!comment && !success}
                        >
                            {!success ? <SendIcon /> : <DoneIcon />}
                        </Button>
                    </Box>

                    <Box className={styles.comments}>
                        {comments.map((comment: Comment) =>
                            <Paper elevation={6} key={comment.id} className={styles.comment}>
                                <Typography textAlign="start">{comment.body}</Typography>
                            </Paper>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Detail;