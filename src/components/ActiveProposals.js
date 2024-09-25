import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';

const activeProposalsData = [
  { id: 1, name: "Proposal 1", votes: 5 },
  { id: 2, name: "Proposal 2", votes: 3 },
  { id: 3, name: "Proposal 3", votes: 8 },
];

const ActiveProposals = () => {
  const [activeProposals, setActiveProposals] = useState(activeProposalsData);

  const handleVote = (id) => {
    const updatedProposals = activeProposals.map((proposal) =>
      proposal.id === id ? { ...proposal, votes: proposal.votes + 1 } : proposal
    );
    setActiveProposals(updatedProposals);
  };

  return (
    <Grid container spacing={4}>
      {activeProposals.map((proposal) => (
        <Grid item xs={12} md={4} key={proposal.id}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card sx={{ background: 'linear-gradient(to right, #43cea2, #185a9d)', color: 'white' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {proposal.name}
                </Typography>
                <Typography variant="body1">
                  Votes: {proposal.votes}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 2 }}
                  onClick={() => handleVote(proposal.id)}
                >
                  Vote
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
};

export default ActiveProposals;
