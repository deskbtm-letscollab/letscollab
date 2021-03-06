import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeamService } from './invitation.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { Http2RmqAuthGuard } from 'src/guard/rmq-auth.guard';

import { IVerify } from '@letscollab/helper';
import { InviteMemberDto } from './invitation.dto';

@Controller('invite')
@ApiTags('v1/Invitation')
export class InvitationController {
  constructor(private readonly teamService: TeamService) {}

  @MessagePattern({ cmd: 'get_name' })
  async getUser(@Payload() username: string) {}

  @Get('query')
  @ApiBearerAuth('jwt')
  @ApiOkResponse({
    // type: QueryTeamResDto,
  })
  // @UseGuards(Http2RmqAuthGuard)
  async queryUsers(@Query() query) {
    // return this.teamService.queryTeam(query);
  }

  @Put('update')
  @ApiBearerAuth('jwt')
  // @UseGuards(Http2RmqAuthGuard)
  async updateTeam(@Body() body) {
    // return this.teamService.updateTeam(body);
  }

  @Post('create')
  @ApiBearerAuth('jwt')
  @UseGuards(Http2RmqAuthGuard)
  async inviteMember(
    @Body() body: InviteMemberDto,
    @Req() req: { user: IVerify },
  ) {
    return this.teamService.inviteMember(body, req.user.body);
  }

  @Get('invite/confirm')
  @ApiBearerAuth('jwt')
  @UseGuards(Http2RmqAuthGuard)
  async confirmInviteMember(@Body() body) {
    // return this.teamService.updateTeam(body);
  }
}
