import { HttpAgent } from "@icp-sdk/core/agent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { ExternalBlob, createActor } from "../backend";
import { mockBackend } from "../mocks/backend";
import type { Resume } from "../types";
import { emptyResume } from "../types";

export function useResume(enabled: boolean) {
  const actorObj = useMemo(() => {
    const cid =
      (import.meta.env.CANISTER_ID_BACKEND as string | undefined) ?? undefined;

    if (!cid) {
      // No canister ID available — use mock backend so the app is usable
      return mockBackend;
    }

    const agent = HttpAgent.createSync({ host: window.location.origin });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const uploadFile = async (_file: ExternalBlob): Promise<any> =>
      new Uint8Array();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const downloadFile = async (bytes: any): Promise<ExternalBlob> =>
      ExternalBlob.fromBytes(bytes as Uint8Array<ArrayBuffer>);
    return createActor(cid, uploadFile, downloadFile, { agent });
  }, []);

  const queryClient = useQueryClient();

  const query = useQuery<Resume>({
    queryKey: ["resume"],
    queryFn: async () => {
      const result = await actorObj.loadResume();
      return result ?? emptyResume();
    },
    enabled: enabled,
  });

  const mutation = useMutation({
    mutationFn: async (resume: Resume) => {
      await actorObj.saveResume(resume);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resume"] });
    },
  });

  return {
    resume: query.data ?? emptyResume(),
    isLoading: query.isLoading,
    isSaving: mutation.isPending,
    saveError: mutation.error,
    save: mutation.mutate,
    saveAsync: mutation.mutateAsync,
  };
}
