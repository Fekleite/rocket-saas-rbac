import { defineAbilityFor } from '@rocket-saas/auth';

const ability = defineAbilityFor({ role: 'MEMBER' });

const userCanInviteSomeoneElse = ability.can('invite', 'User');
