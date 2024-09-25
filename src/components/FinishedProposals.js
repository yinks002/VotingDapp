import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const finishedProposalsData = [
  { id: 1, name: "Finished Proposal 1", votes: 15 },
  { id: 2, name: "Finished Proposal 2", votes: 20 },
  { id: 3, name: "Finished Proposal 3", votes: 10 },
];

const FinishedProposals = () => {
  return (
    <Grid container spacing={3}>
      {finishedProposalsData.map((proposal) => (
        <Grid item xs={12} md={4} key={proposal.id}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {proposal.name}
              </Typography>
              <Typography variant="body1">
                Final Votes: {proposal.votes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FinishedProposals;
