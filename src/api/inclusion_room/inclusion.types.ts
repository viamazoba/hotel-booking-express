import { Inclusion_room as Inclusion_roomModel  } from "@prisma/client";

export type Inclusion_room = Inclusion_roomModel;

export type CreateInclusionData = Omit<Inclusion_roomModel, 'id'>