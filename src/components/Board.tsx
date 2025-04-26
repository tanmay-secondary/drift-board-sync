
import React, { useState } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import TaskList from './TaskList';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';

const Board = () => {
  const { activeBoard, createList } = useTaskContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [isGithubDialogOpen, setIsGithubDialogOpen] = useState(false);
  const [githubRepo, setGithubRepo] = useState('');

  const handleCreateList = () => {
    if (newListTitle.trim() && activeBoard) {
      createList(activeBoard.id, newListTitle.trim());
      setNewListTitle('');
      setIsDialogOpen(false);
    }
  };

  const handleConnectGithub = () => {
    if (githubRepo.trim() && activeBoard) {
      // In a real implementation, this would validate and setup GitHub webhooks
      // For now, we'll just store the repo URL
      const { connectGithubRepo } = useTaskContext();
      connectGithubRepo(activeBoard.id, githubRepo.trim());
      setGithubRepo('');
      setIsGithubDialogOpen(false);
    }
  };

  if (!activeBoard) {
    return (
      <div className="flex h-full items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-bold mb-4">No Board Selected</h2>
          <p className="text-muted-foreground">
            Please select or create a board to get started.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{activeBoard.title}</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setIsGithubDialogOpen(true)}
            >
              {activeBoard.githubRepo ? 'Change GitHub Repo' : 'Connect GitHub Repo'}
            </Button>
          </div>
        </div>
        
        <div className="board-container justify-center">
          {activeBoard.lists.map(list => (
            <TaskList key={list.id} list={list} boardId={activeBoard.id} />
          ))}
          
          <Button 
            variant="outline" 
            className="flex-shrink-0 h-12 px-4 bg-background"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add List
          </Button>
        </div>
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New List</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="list-title">List Title</Label>
            <Input 
              id="list-title"
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              placeholder="Enter list title"
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateList}>Create List</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isGithubDialogOpen} onOpenChange={setIsGithubDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect GitHub Repository</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="github-repo">Repository URL</Label>
            <Input 
              id="github-repo"
              value={githubRepo}
              onChange={(e) => setGithubRepo(e.target.value)}
              placeholder="https://github.com/username/repository"
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground mt-2">
              Connecting a GitHub repository will allow tasks to be automatically closed when a commit message contains the task ID.
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsGithubDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleConnectGithub}>Connect Repository</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Board;
