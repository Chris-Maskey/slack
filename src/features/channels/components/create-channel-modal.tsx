import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCreateChannelModal } from "../store/use-create-channel-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateChannel } from "../api/use-create-channels";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

const CreateChannelSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Channel name must of atleast 3 characters",
    })
    .max(80, {
      message: "Channel name must not exceed 80 characters",
    }),
});

type CreateChannelSchemaType = z.infer<typeof CreateChannelSchema>;

export const CreateChannelModal = () => {
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useCreateChannel();

  const [open, setOpen] = useCreateChannelModal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isLoading, errors },
  } = useForm<CreateChannelSchemaType>({
    resolver: zodResolver(CreateChannelSchema),
    defaultValues: {
      name: "",
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "-").toLowerCase();
    setValue("name", value);
  };

  const onSubmit = ({ name }: CreateChannelSchemaType) => {
    mutate({
      name,
      workspaceId,
    }).then(() => {
      handleClose();
    });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            {...register("name")}
            disabled={isLoading || isPending}
            onChange={handleChange}
            autoFocus
            minLength={3}
            maxLength={80}
            placeholder="e.g plan-budget"
          />
          <div className="flex justify-end">
            <Button disabled={isLoading || isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
