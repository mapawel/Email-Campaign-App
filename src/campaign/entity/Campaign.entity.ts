import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { CampaignStatus } from '../status/campaign-status.enum';
import { MailContentType } from 'src/template/types/Mail-content.type';
import { Template } from 'src/template/entity/Template.entity';
import { EmailProvider } from '../../email-provider/entity/Email-provider.entity';

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: CampaignStatus,
        default: CampaignStatus.PREPARING,
    })
    status: CampaignStatus;

    @ManyToOne(() => Template, (template) => template.campaigns, {
        eager: true,
    })
    @JoinColumn()
    template: Template;

    @ManyToOne(
        () => EmailProvider,
        (eMailProvider) => eMailProvider.campaigns,
        {
            eager: true,
        },
    )
    @JoinColumn()
    eMailProvider: EmailProvider;

    @Column('json', { nullable: true })
    content: MailContentType;

    @Column({ nullable: true })
    eMailTitle: string;

    @Column('simple-array', { nullable: true })
    eMails: string[];

    @Column()
    manager: string; // user id from Auth0

    @Column('simple-array', { nullable: true })
    employees: string[];

    @Column()
    updatedAt: Date;

    @Column()
    updatedBy: string; // user id from Auth0

    @Column({ nullable: true })
    preparedAt: Date;

    @Column({ nullable: true })
    preparedBy: string; // user id from Auth0

    @Column({ nullable: true })
    executedAt: Date;

    @Column({ nullable: true })
    executedBy: string; // user id from Auth0

    @Column({ nullable: true })
    errorAt: Date;

    @Column({ nullable: true })
    errorReason: string;
}
