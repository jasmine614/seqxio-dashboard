import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

export const SupportModal = ({ isOpen, onOpenChange, defaultType = 'question' }) => {
    const [issueType, setIssueType] = useState(defaultType);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (isOpen) {
            setIssueType(defaultType);
        }
    }, [isOpen, defaultType]);

    const handleSubmit = () => {
        console.log("Support request submitted:", { issueType, description });
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Contact support</DialogTitle>
                    <DialogDescription>
                        Our support team is here to assist you.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="issue-type" className="text-right">
                            Issue Type
                        </Label>
                        <Select value={issueType} onValueChange={setIssueType}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select an issue type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bug">Bug</SelectItem>
                                <SelectItem value="question">Question</SelectItem>
                                <SelectItem value="feature">Feature Request</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea 
                            id="description"
                            placeholder="Please describe the issue..."
                            className="col-span-3"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Submit</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
